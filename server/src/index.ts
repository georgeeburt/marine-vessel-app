import express from 'express';
import http from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';
import vesselRoutes from './routes/vessel-routes';
import socketConfig from './config/socket-config';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE'],
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
