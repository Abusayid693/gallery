import fs from 'fs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import socket from 'socket.io';
import configs from './configs';
import * as helpers from './helpers';

/**
 * Root path from where script is run
 */
const rootPath = '.';

const PORT = 5002;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const readFolder = (
  dir: string,
  imagePaths: {
    type: string;
    path: string;
    name: string;
  }[] = [],
  imageFormats: Set<string> = new Set([])
) => {
  const files = fs.readdirSync(dir, {withFileTypes: true});

  files.forEach(file => {
    if (!configs.ignore.includes(file.name)) {
      if (file.isDirectory()) {
        readFolder(dir + '/' + file.name, imagePaths, imageFormats);
        return;
      }
      const fileExtention = helpers.getExtension(file.name);
      if (helpers.isImage(fileExtention)) {
        imageFormats.add(fileExtention);
        const data = {
          type: fileExtention,
          path: dir + '/' + file.name,
          name: file.name
        };
        imagePaths.push(data);
      }
    }
  });

  return {imagePaths, imageFormats};
};

const getImageBuffer = async (
  urls: {
    type: string;
    path: string;
  }[]
) => {
  const images: any[] = [];

  for (const url of urls) {
    try {
      let data = await fs.promises.readFile(url.path, 'base64');
      let size = helpers.getFilesizeInBytes(url.path);
      let stats = helpers.getFileStat(url.path);
      images.push({
        buffer: data,
        size,
        ...url,
        ...stats
      });
    } catch (err) {
      console.log(err);
    }
  }
  return images;
};

io.on('connection', async socket => {
  console.log(`user connected to socket with id: ${socket.id}`);

  const {imagePaths, imageFormats} = readFolder(rootPath);
  const images = await getImageBuffer(imagePaths);
  socket.emit('load-images', {
    d: images,
    total: images.length,
    imageFormats: [...imageFormats]
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
