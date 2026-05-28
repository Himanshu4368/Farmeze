import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const androidIcons = [
  ['mipmap-mdpi', 48],
  ['mipmap-hdpi', 72],
  ['mipmap-xhdpi', 96],
  ['mipmap-xxhdpi', 144],
  ['mipmap-xxxhdpi', 192],
];

const iosIcons = [
  ['Icon-20@2x.png', 40],
  ['Icon-20@3x.png', 60],
  ['Icon-29@2x.png', 58],
  ['Icon-29@3x.png', 87],
  ['Icon-40@2x.png', 80],
  ['Icon-40@3x.png', 120],
  ['Icon-60@2x.png', 120],
  ['Icon-60@3x.png', 180],
  ['Icon-1024.png', 1024],
];

const contentsJson = {
  images: [
    { idiom: 'iphone', scale: '2x', size: '20x20', filename: 'Icon-20@2x.png' },
    { idiom: 'iphone', scale: '3x', size: '20x20', filename: 'Icon-20@3x.png' },
    { idiom: 'iphone', scale: '2x', size: '29x29', filename: 'Icon-29@2x.png' },
    { idiom: 'iphone', scale: '3x', size: '29x29', filename: 'Icon-29@3x.png' },
    { idiom: 'iphone', scale: '2x', size: '40x40', filename: 'Icon-40@2x.png' },
    { idiom: 'iphone', scale: '3x', size: '40x40', filename: 'Icon-40@3x.png' },
    { idiom: 'iphone', scale: '2x', size: '60x60', filename: 'Icon-60@2x.png' },
    { idiom: 'iphone', scale: '3x', size: '60x60', filename: 'Icon-60@3x.png' },
    { idiom: 'ios-marketing', scale: '1x', size: '1024x1024', filename: 'Icon-1024.png' },
  ],
  info: {
    author: 'xcode',
    version: 1,
  },
};

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

const crc32 = (buffers) => {
  let crc = 0xffffffff;
  for (const buffer of buffers) {
    for (const byte of buffer) {
      crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const chunk = (type, data) => {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32([typeBuffer, data]));
  return Buffer.concat([length, typeBuffer, data, crc]);
};

const png = (width, height, rgba) => {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rawOffset = y * (width * 4 + 1);
    raw[rawOffset] = 0;
    rgba.copy(raw, rawOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
};

const rgba = (hex, alpha = 255) => {
  const value = hex.replace('#', '');
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
    alpha,
  ];
};

const blend = (from, to, amount) =>
  from.map((channel, index) =>
    index === 3
      ? channel
      : Math.round(channel + (to[index] - channel) * amount),
  );

const setPixel = (buffer, width, x, y, color) => {
  const index = (y * width + x) * 4;
  buffer[index] = color[0];
  buffer[index + 1] = color[1];
  buffer[index + 2] = color[2];
  buffer[index + 3] = color[3];
};

const fillShape = (buffer, size, test, color) => {
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (test(x + 0.5, y + 0.5)) {
        setPixel(buffer, size, x, y, color);
      }
    }
  }
};

const renderIcon = (size, round = false) => {
  const buffer = Buffer.alloc(size * size * 4);
  const top = rgba('#31C856');
  const bottom = rgba('#0C7A36');
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2;

  for (let y = 0; y < size; y += 1) {
    const color = blend(top, bottom, y / Math.max(1, size - 1));
    for (let x = 0; x < size; x += 1) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const insideRound = !round || dx * dx + dy * dy <= radius * radius;
      setPixel(buffer, size, x, y, insideRound ? color : [0, 0, 0, 0]);
    }
  }

  fillShape(
    buffer,
    size,
    (x, y) => y > size * 0.68 + Math.sin(x / size * Math.PI * 3) * size * 0.025,
    rgba('#075C2B'),
  );

  fillShape(
    buffer,
    size,
    (x, y) => {
      const dx = (x - size * 0.64) / (size * 0.25);
      const dy = (y - size * 0.42) / (size * 0.16);
      return dx * dx + dy * dy <= 1 && x > size * 0.42;
    },
    rgba('#DDF8C8'),
  );

  fillShape(
    buffer,
    size,
    (x, y) => {
      const dx = (x - size * 0.58) / (size * 0.035);
      const dy = (y - size * 0.45) / (size * 0.23);
      return dx * dx + dy * dy <= 1;
    },
    rgba('#FFFFFF', 235),
  );

  fillShape(
    buffer,
    size,
    (x, y) =>
      x >= size * 0.24 &&
      x <= size * 0.36 &&
      y >= size * 0.22 &&
      y <= size * 0.74,
    rgba('#FFFFFF'),
  );

  fillShape(
    buffer,
    size,
    (x, y) =>
      x >= size * 0.32 &&
      x <= size * 0.66 &&
      y >= size * 0.22 &&
      y <= size * 0.34,
    rgba('#FFFFFF'),
  );

  fillShape(
    buffer,
    size,
    (x, y) =>
      x >= size * 0.32 &&
      x <= size * 0.58 &&
      y >= size * 0.43 &&
      y <= size * 0.54,
    rgba('#FFFFFF'),
  );

  return png(size, size, buffer);
};

for (const [folder, size] of androidIcons) {
  const outputDir = join(rootDir, 'android', 'app', 'src', 'main', 'res', folder);
  writeFileSync(join(outputDir, 'ic_launcher.png'), renderIcon(size));
  writeFileSync(join(outputDir, 'ic_launcher_round.png'), renderIcon(size, true));
}

const iosDir = join(rootDir, 'ios', 'newApp', 'Images.xcassets', 'AppIcon.appiconset');
for (const [filename, size] of iosIcons) {
  writeFileSync(join(iosDir, filename), renderIcon(size));
}

writeFileSync(
  join(iosDir, 'Contents.json'),
  `${JSON.stringify(contentsJson, null, 2)}\n`,
);

