const testFolder = "..";
import fs from "fs";
import path from "path";
import express from "express";
import http from "http";
import cors from "cors";
import socket from "socket.io";

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
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const isImage = (s: string) => {
  const bool = supported.has(s);
  return bool;
};

const getExtension = (url: string) => {
  return path.extname(url).slice(1).toLowerCase();
};

const readFolder = (
  dir: string,
  imagePaths: {
    type: string;
    path: string;
  }[] = []
) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    if (!skip.includes(file.name)) {
      if (file.isDirectory()) {
        readFolder(dir + "/" + file.name, imagePaths);
        return;
      }
      const fileExtention = getExtension(file.name);
      if (isImage(fileExtention)) {
        const data = { type: fileExtention, path: dir + "/" + file.name };
        imagePaths.push(data);
      }
    }
  });

  return imagePaths;
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
      let data = await fs.promises.readFile(url.path, "base64");

      images.push({
        path: url.path,
        buffer: data,
        type: url.type,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return images;
};

io.on("connection", async (socket) => {
  console.log(`user connected to socket with id: ${socket.id}`);

  const urls = readFolder(testFolder, []);
  const images = await getImageBuffer(urls);
  socket.emit("load-images", { d: images, total: images.length });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
