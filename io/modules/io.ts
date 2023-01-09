import socket from 'socket.io';
import * as fileHandler from './file';

module.exports = (
  io: socket.Server<any, any, any, any>,
  sockets: Set<string>
) => {
  async function emitEditedFile(url: string) {
    let data = await fileHandler.getImageBufferData(url);
    io.to([...sockets]).emit('file-update', {data, path: data?.path});
  }

  async function emitAddedFile(url:string) {
    let data = await fileHandler.getImageBufferData(url);
    io.to([...sockets]).emit('file-add', {data, path: data?.path});
  }

  async function emitDeletedFile(url:string) {
    io.to([...sockets]).emit('file-delete', {path: url});
  }

  return {emitEditedFile, emitAddedFile, emitDeletedFile};
};
