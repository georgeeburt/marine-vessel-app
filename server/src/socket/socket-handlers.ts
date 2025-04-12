import type { Socket, Server } from 'socket.io';

export default function socketHandlers(socket: Socket, io: Server) {
  socket.on('vessel:added', (vesselData) => {
    console.log('Vessel added:', vesselData);
  });

  socket.on('vessel:update', (vesselData) => {
    console.log('Vessel added:', vesselData);
  });

  socket.on('vessel:removed', (vesselData) => {
    console.log('Vessel removed:', vesselData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}
