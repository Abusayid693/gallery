import { Io, Socket } from "../types";
import * as fileHandler from './file';

module.exports = (
  io: Io,
  sockets: Set<string>
) => {
  /**
   * Delete existing file
   */
  io.on("delete-file", (socket:Socket)=>{
    const {path} = socket.data
    fileHandler.deleteFile(path)
  })

  async function emitEditedFile(url: string) {
    let data = await fileHandler.getImageBufferData(url);
    io.to([...sockets]).emit('file-update', {data, path: data?.path});
  }

  async function emitAddedFile(url:string) {
    let data = await fileHandler.getImageBufferData(url);
    io.to([...sockets]).emit('file-add', {data, path: './' + data?.path});
  }

  async function emitDeletedFile(url:string) {
    io.to([...sockets]).emit('file-delete', {path: './' + url});
  }

  return {emitEditedFile, emitAddedFile, emitDeletedFile};
};
