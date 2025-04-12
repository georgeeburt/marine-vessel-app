import socketHandlers from '../socket/socket-handlers';
import type { Server } from 'socket.io';

export default function socketConfig(io: Server) {
  io.on('connect', (socket) => {
    socketHandlers(socket, io);
  });
}
