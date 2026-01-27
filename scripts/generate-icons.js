/**
 * Script om PWA iconen te genereren
 *
 * Installeer eerst: npm install sharp
 * Draai dan: node scripts/generate-icons.js
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = join(projectRoot, 'public', 'icons');

// Ensure icons directory exists
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const svgPath = join(iconsDir, 'icon.svg');
const svgBuffer = readFileSync(svgPath);

async function generateIcons() {
  console.log('Genereren van PWA iconen...');

  for (const size of sizes) {
    const outputPath = join(iconsDir, `icon-${size}x${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`  ✓ icon-${size}x${size}.png`);
  }

  console.log('\nAlle iconen zijn gegenereerd!');
}

generateIcons().catch(console.error);
