"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testFolder = "..";
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const skip = ["io", "node_modules"];
const supported = new Set(["png", "svg"]);
const PORT = 5002;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const isImage = (s) => {
    const bool = supported.has(s);
    return bool;
};
const getExtension = (url) => {
    return path_1.default.extname(url).slice(1).toLowerCase();
};
const readFolder = (dir, imagePaths = []) => {
    const files = fs_1.default.readdirSync(dir, { withFileTypes: true });
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
const getImageBuffer = async (urls) => {
    const images = [];
    for (const url of urls) {
        try {
            let data = await fs_1.default.promises.readFile(url.path, "base64");
            images.push({
                path: url.path,
                buffer: data,
                type: url.type,
            });
        }
        catch (err) {
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
//# sourceMappingURL=index.js.map