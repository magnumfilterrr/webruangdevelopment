import sharp from 'sharp';

// Buat background biru dulu lalu composite dengan logo
await sharp({
  create: {
    width: 32,
    height: 32,
    channels: 4,
    background: { r: 14, g: 165, b: 233, alpha: 1 }
  }
})
.composite([{
  input: await sharp('public/putih.png')
    .resize(24, 24, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer(),
  gravity: 'center'
}])
.png()
.toFile('public/favicon-32.png');

// Apple icon 180x180
await sharp({
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: { r: 14, g: 165, b: 233, alpha: 1 }
  }
})
.composite([{
  input: await sharp('public/putih.png')
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer(),
  gravity: 'center'
}])
.png()
.toFile('public/apple-icon.png');

// favicon 16x16
await sharp({
  create: {
    width: 16,
    height: 16,
    channels: 4,
    background: { r: 14, g: 165, b: 233, alpha: 1 }
  }
})
.composite([{
  input: await sharp('public/putih.png')
    .resize(12, 12, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer(),
  gravity: 'center'
}])
.png()
.toFile('public/favicon-16.png');

console.log('✅ Favicon generated!');