const testFolder = "..";
import fs from "fs"
import path from "path"
import express from 'express';
import http from 'http';
import cors from 'cors';
import socket from 'socket.io';

/**
 * Skip files or folder, default can be overwritten by a config file
 */
const skip = ["io", "node_modules"];

/**
 * Supported images types, default can be overwritten by a config file
 */
const supported = new Set(["png", "svg"]);


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


const isImage = (filePath:string) => {
  const bool = supported.has(path.extname(filePath).slice(1).toLowerCase());
  return bool;
};

const readFolder = (dir:string, imagePaths:string[] = []) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    if (!skip.includes(file.name)) {
      if (file.isDirectory()) {
        readFolder(dir + "/" + file.name, imagePaths);
        return;
      }
      if (isImage(file.name)) {
        imagePaths.push(dir + "/" + file.name);
      }
    }
  });

  return imagePaths;
};
const arr = readFolder(testFolder, []);
console.log("arr :", arr);

io.on('connection', socket => {
  console.log(`user connected to socket with id: ${socket.id}`);
  
  socket.emit("load-images", {d:''})
})


server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});