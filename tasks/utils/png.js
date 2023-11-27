import fs from 'fs';
import { PNG } from 'pngjs';

const readFile = (path) => {
  return new Promise((resolve) => {
    fs.readFile(path, (err, file) => {
      if (err) return resolve(err);
      resolve({ path, file });
    });
  });
};

export const loadPngs = async (names) => {
  return await Promise.all(names.map(name => {
    return readFile(name);
  })).then((files) => {
    return files.map(f => {
      return {
        ...f,
        file: PNG.sync.read(f.file),
      };
    });
  });
};
