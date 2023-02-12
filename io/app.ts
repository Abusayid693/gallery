import chokidar from 'chokidar';
import cors from 'cors';
import express, { Express } from 'express';
import http from 'http';
import _ from 'lodash';
import path from 'path';
import socket from 'socket.io';
import { configs, prepareConfiguration } from "./configs";
import * as fileHandler from './modules/file';
import * as utils from './modules/utils';
const _ioHandler = require('./modules/io');

/**
 * Root path from where script is run
 */
const rootPath = '.';
/**
 * Local sockets instances for soft refresh
 */
const PORT = 5002;

module.exports = async (app: Express) => {
  await prepareConfiguration();
  app.use(cors());

  app.use(express.static(path.join(__dirname, '../../', 'ui/build')));
  app.use(express.static('public'));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, '../../', 'ui/build'));
  });
  const server = http.createServer(app);
  const sockets = new Set<string>([]);

  await server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    const url = 'http://localhost:5002';
    const start =
      process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open';
    // require('child_process').exec(start + ' ' + url);
  });

  const io = new socket.Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  const ioHandler = _ioHandler(io, sockets);

  const watcher = chokidar.watch(utils.generateChokidarWatchPattern(configs.formats), {
    ignored: [/(^|[\/\\])\../, ...configs.ignore], // ignore dirs
    persistent: true,
    awaitWriteFinish: false,
    ignoreInitial: true
  });

  watcher
    .on('change', async path => {
      // emit event here to with changed file data, consider multiple edge cases
      console.log(`File ${path} changed`);
      await ioHandler.emitEditedFile(path);
    })
    .on('add', async path => {
      // emit event here to with new file data
      console.log(`File ${path} add`);
      await ioHandler.emitAddedFile(path);
    })
    .on('unlink', path => {
      // emit event here when file is removed
      console.log(`File ${path} has been removed`);
      ioHandler.emitDeletedFile(path);
    });

  io.on('connection', async socket => {
    console.log(`instance connected to socket with id: ${socket.id}`);
    sockets.add(socket.id);

    const {imagePaths, imageFormats} = fileHandler.readFolder(rootPath);
    const images = await fileHandler.getImageBuffer(imagePaths);
    const newData = _.orderBy(images, e => e.name.toLowerCase());

    socket.emit('load-images', {
      d: newData,
      total: images.length,
      imageFormats: [...imageFormats]
    });

    socket.on('disconnect', () => {
      console.log(`instance disconnected with id: ${socket.id}`);
      sockets.delete(socket.id);
    });
  });

  server.on('error', () => {
    watcher.removeAllListeners(), io.removeAllListeners();
  });
};
