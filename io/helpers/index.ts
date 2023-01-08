import fs from 'fs';
import path from 'path';
import configs from '../configs';

const supported = new Set(configs.formats);

export const isImage = (s: string) => {
  const bool = supported.has(s);
  return bool;
};

export const getExtension = (url: string) => {
  return path
    .extname(url)
    .slice(1)
    .toLowerCase();
};

export const getFilesizeInBytes = (url: string) => {
  const stats = fs.statSync(url);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
};

export const getFileStat = (url: string) => {
  let stats = fs.statSync(url);
  return {
    created: stats.birthtime
  };
};
