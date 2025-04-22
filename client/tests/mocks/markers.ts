import { createMockGoogleMarker } from './mock-marker';
import type { VesselMarker } from '../../../shared/types/vessel-marker';

export const mockVesselMarkers: VesselMarker[] = [
  {
    id: 1,
    name: 'Voyager I',
    latitude: 34.0522,
    longitude: -118.2437,
    marker: createMockGoogleMarker(),
  },
  {
    id: 2,
    name: 'Sea Breeze',
    latitude: 36.1699,
    longitude: -115.1398,
    marker: createMockGoogleMarker(),
  },
];

export const mockVesselMarker = mockVesselMarkers[0];
