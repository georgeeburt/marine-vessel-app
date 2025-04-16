import type { Vessel } from '../../../shared/types/vessel';

export const mockVessels: Vessel[] = [
  {
    id: 1,
    name: 'Voyager I',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 2,
    name: 'Sea Breeze',
    latitude: 36.1699,
    longitude: -115.1398,
  },
  {
    id: 3,
    name: 'Atlantic Explorer',
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: 4,
    name: 'Pacific Rider',
    latitude: 35.6895,
    longitude: 139.6917,
  },
  {
    id: 5,
    name: 'Northern Star',
    latitude: 64.9631,
    longitude: -19.0208,
  },
];

export const mockVessel: Vessel = mockVessels[0];
