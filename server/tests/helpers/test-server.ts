import { Express } from 'express';
import { Server } from 'http';
import request from 'supertest';

export function createTestServer(app: Express): {
  server: Server;
  request: ReturnType<typeof request>;
} {
  const server = app.listen();
  const req = request(server);

  return { server, request: req };
}
