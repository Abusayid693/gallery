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
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const isImage = (filePath) => {
    const bool = supported.has(path_1.default.extname(filePath).slice(1).toLowerCase());
    return bool;
};
const readFolder = (dir, imagePaths = []) => {
    const files = fs_1.default.readdirSync(dir, { withFileTypes: true });
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
    socket.emit("load-images", { d: '' });
});
server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map