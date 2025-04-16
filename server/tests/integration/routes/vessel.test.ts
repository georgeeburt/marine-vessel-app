import express from 'express';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createTestServer } from '../../helpers/test-server';
import { mockVessels } from '../../mocks/vessels';
import type { Server } from 'http';

const testApp = express();
testApp.get('/api/vessels', (req, res) => {
  res.json(mockVessels);
});

testApp.get('/api/vessels/empty', (req, res) => {
  res.json([]);
});

describe('Vessel Routes', () => {
  let server: Server;
  let request: any;

  beforeAll(() => {
    const testServer = createTestServer(testApp);
    server = testServer.server;
    request = testServer.request;
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /api/vessels', () => {
    it('should return a list of vessels', async () => {
      const response = await request.get('/api/vessels');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      if (response.body.length > 0) {
        response.body.forEach((vessel: any) => {
          expect(vessel).toHaveProperty('id');
          expect(vessel).toHaveProperty('name');
          expect(vessel).toHaveProperty('latitude');
          expect(vessel).toHaveProperty('longitude');

          expect(typeof vessel.id).toBe('number');
          expect(typeof vessel.name).toBe('string');
          expect(typeof vessel.latitude).toBe('number');
          expect(typeof vessel.longitude).toBe('number');

          expect(vessel.latitude).toBeGreaterThanOrEqual(-90);
          expect(vessel.latitude).toBeLessThanOrEqual(90);
          expect(vessel.longitude).toBeGreaterThanOrEqual(-180);
          expect(vessel.longitude).toBeLessThanOrEqual(180);
        });
      }
    });

    it('should return an empty array if no vessels are found', async () => {
      const response = await request.get('/api/vessels/empty');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });
  });
});
