import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

// Generate favicon 32x32
await sharp('public/putih.png')
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32.png');

// Generate favicon 16x16  
await sharp('public/putih.png')
  .resize(16, 16)
  .png()
  .toFile('public/favicon-16.png');

// Generate apple icon 180x180
await sharp('public/putih.png')
  .resize(180, 180)
  .png()
  .toFile('public/apple-icon.png');

console.log('✅ Favicon generated!');