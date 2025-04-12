import express from 'express';
import dotenv from 'dotenv';
import http from 'node:http';
import { Server } from 'socket.io';
import socketConfig from './config/socket-config';

dotenv.config();

export const app = express();
const server = http.createServer(app);
const io = new Server(server)

// Middleware
app.use(express.json());

socketConfig(io);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
