import express from 'express';
import http from 'node:http';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import vesselRoutes from './routes/vessel-routes';
import socketConfig from './socket/socket-config';
dotenv.config();

export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use('/api/vessels', vesselRoutes);

socketConfig(io);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
