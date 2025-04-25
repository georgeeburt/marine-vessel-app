import { vi } from 'vitest';

export const mockEmitAddVessel = vi.fn();
export const mockEmitUpdateVessel = vi.fn();
export const mockEmitDeleteVessel = vi.fn();

export const mockSocketListeners = {
  onVesselAdded: vi.fn(),
  onVesselUpdated: vi.fn(),
  onVesselDeleted: vi.fn(),
  onError: vi.fn(),
};

export const mockUseSocket = () => {
  return {
    emitAddVessel: mockEmitAddVessel,
    emitUpdateVessel: mockEmitUpdateVessel,
    emitDeleteVessel: mockEmitDeleteVessel,

    onVesselAdded: mockSocketListeners.onVesselAdded,
    onVesselUpdated: mockSocketListeners.onVesselUpdated,
    onVesselDeleted: mockSocketListeners.onVesselDeleted,
    onError: mockSocketListeners.onError,
  };
};

export function mockSocket() {
  vi.mock('@/composables/use-socket', () => ({
    useSocket: mockUseSocket,
  }));
}

export function resetSocketMocks() {
  mockEmitAddVessel.mockReset();
  mockEmitUpdateVessel.mockReset();
  mockEmitDeleteVessel.mockReset();

  mockSocketListeners.onVesselAdded.mockReset();
  mockSocketListeners.onVesselUpdated.mockReset();
  mockSocketListeners.onVesselDeleted.mockReset();
  mockSocketListeners.onError.mockReset();
}
