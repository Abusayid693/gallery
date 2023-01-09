import chokidar from 'chokidar';
import cors from 'cors';
import express from 'express';
import http from 'http';
import socket from 'socket.io';
import configs from './configs';
import * as fileHandler from './modules/file';

/**
 * Root path from where script is run
 */
const rootPath = '.';
/**
 * Local sockets instances for soft refresh
 */
const sockets = new Set<string>([]);

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

const watcher = chokidar.watch(['./**/*.svg'], {
  ignored: [/(^|[\/\\])\../, ...configs.ignore], // ignore dirs
  persistent: true,
  awaitWriteFinish: false,
  ignoreInitial: true
});

watcher
  .on('change', async path => {
    // emit event here to with changed file data, consider multiple edge cases
    console.log(`File ${path} changed`);
  })
  .on('add', path => {
    // emit event here to with new file data
    console.log(`File ${path} add`);
  })
  .on('unlink', path => {
    // emit event here when file is removed
    console.log(`File ${path} has been removed`);
  });

io.on('connection', async socket => {
  console.log(`instance connected to socket with id: ${socket.id}`);
  sockets.add(socket.id);

  const {imagePaths, imageFormats} = fileHandler.readFolder(rootPath);
  const images = await fileHandler.getImageBuffer(imagePaths);

  socket.emit('load-images', {
    d: images,
    total: images.length,
    imageFormats: [...imageFormats]
  });

  socket.on('disconnect', () => {
    console.log(`instance disconnected with id: ${socket.id}`);
    sockets.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
