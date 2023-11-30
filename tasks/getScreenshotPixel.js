import { loadPngs } from './utils/png.js';
import fs from 'fs';

export const getScreenshotPixel = async ({ screenshot, x, y }) => {
  const [file] = await loadPngs([
    screenshot,
  ]);

  fs.unlinkSync(screenshot);

  const img = file.file;
  const { width, data } = img;

  const k = (x + y * width) << 2;
  const res = [data[k], data[k + 1], data[k + 2]];

  return `#${res.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};
