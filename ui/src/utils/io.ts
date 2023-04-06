import io, { Socket } from 'socket.io-client';
const SERVER = 'http://localhost:5002';

let socket: Socket<any, any>;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log(`socket io connected id: ${socket.id}`);
  });

  return socket;
};
