import fs from 'fs';
import path from 'path';

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export const isImage = (s: string, configs: any) => {
  const supported = new Set(configs.formats);
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
  const bytes = stats.size;
  if (bytes == 0) return 'n/a';
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  if (i == 0) return {value: bytes.toLocaleString(), inBytes: bytes, type: sizes[i]};
  return {value: (bytes / Math.pow(1024, i)).toFixed(1), inBytes: bytes, type: sizes[i]};
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

export const getDirname = (url: string) => {
  return path.dirname(url);
};

export const getFileExtension = (url: string) => {
  return path.extname(url);
};

export const readFolder = (
  dir: string,
  configs: any,
  imagePaths: string[] = [],
  imageFormats: Set<string> = new Set([])
) => {
  const files = fs.readdirSync(dir, {withFileTypes: true});

  files.forEach(file => {
    if (!configs.ignore.includes(file.name)) {
      if (file.isDirectory()) {
        readFolder(dir + '/' + file.name, configs, imagePaths, imageFormats);
        return;
      }
      const fileExtention = getExtension(file.name);
      if (isImage(fileExtention, configs)) {
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
      directory: getDirname(url),
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

export const getConnfigurationData = async () => {
  try {
    const data = await fs.promises.readFile('./gallery.config.json', 'utf8');
    const obj = JSON.parse(data);
    return obj;
  } catch (error) {
    console.warn('Invalid configuration');
    throw new Error('Invalid configuration');
  }
};
