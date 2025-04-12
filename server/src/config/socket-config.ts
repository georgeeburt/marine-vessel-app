import socketHandlers from '../socket/socket-handlers';
import type { Server } from 'socket.io';

export default function socketConfig(io: Server) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Mount socket handlers
    socketHandlers(socket, io);

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
}
