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

export const getFileName = (url: string) => {
  return path.basename(url);
};

export const getFileExtension = (url: string) => {
  return path.extname(url);
};

export const readFolder = (
  dir: string,
  imagePaths: string[] = [],
  imageFormats: Set<string> = new Set([])
) => {
  const files = fs.readdirSync(dir, {withFileTypes: true});

  files.forEach(file => {
    if (!configs.ignore.includes(file.name)) {
      if (file.isDirectory()) {
        readFolder(dir + '/' + file.name, imagePaths, imageFormats);
        return;
      }
      const fileExtention = getExtension(file.name);
      if (isImage(fileExtention)) {
        imageFormats.add(fileExtention);
        imagePaths.push(dir + '/' + file.name);
      }
    }
  });

  return {imagePaths, imageFormats};
};

export const getImageBufferData = async (url: string) => {
  try {
    let data = await fs.promises.readFile(url, 'base64');
    let size = getFilesizeInBytes(url);
    let stats = getFileStat(url);

    return {
      buffer: data,
      size,
      path: url,
      name: getFileName(url),
      type: getExtension(url),
      ...stats
    };
  } catch (error) {
    console.log(`Error occoured at ${__filename}.getImageBufferData: ${error}`);
  }
  return;
};

export const getImageBuffer = async (urls: string[]) => {
  const images: any[] = [];

  for (const url of urls) {
    try {
      let data = await getImageBufferData(url);
      images.push({...data});
    } catch (error) {
      console.log(`Error occoured at ${__filename}.getImageBuffer: ${error}`);
    }
  }
  return images;
};