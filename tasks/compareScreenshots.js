import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';
import { loadPngs } from './utils/png.js';

const readFile = (path) => {
  return new Promise((resolve) => {
    fs.readFile(path, (err, file) => {
      if (err) return resolve(err);
      resolve({ path, file });
    });
  });
};

const runComparison = async (options) => {
  const files = await loadPngs([
    options.initialScreenshot,
    options.currentScreenshot,
  ]);

  const img1 = files.find(({ path }) => path.match('-orig')).file;
  const img2 = files.find(({ path }) => path.match('-comp')).file;
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const totalPixels = width * height;

  const changedPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { treshold: options.treshold });
  const changeRatio = changedPixels / totalPixels;

  switch (options.compare) {
    case 'shouldChange': return changeRatio > options.treshold;
    case 'shouldNotChange': return changeRatio <= options.treshold;
  }
  return false;
};

export const compareScreenshots = (options) => {
  return runComparison(options);
};
