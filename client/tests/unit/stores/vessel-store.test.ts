import { setActivePinia, createPinia } from 'pinia';
import { it, describe, beforeEach, expect } from 'vitest';
import { mockVessel, mockVessels } from '../../mocks/data/vessels';
import { useVesselStore } from '../../../src/stores/vessel-store';

describe('Vessel Store', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('should add a vessel to the store', () => {
    const store = useVesselStore();
    store.addVessel(mockVessel);

    expect(store.vessels.length).toBe(1);
    expect(store.vessels[0].name).toEqual(mockVessels[0].name);
    expect(mockVessel.name).toEqual(mockVessels[0].name);
  });

  it('should update a vessel in the store', () => {
    const store = useVesselStore();
    store.addVessel(mockVessel);

    const updatedVessel = { ...mockVessel, name: 'Updated Vessel' };
    store.updateVessel(updatedVessel);
    expect(store.vessels[0].name).toEqual('Updated Vessel');
  });

  it('should delete a vessel from the store', () => {
    const store = useVesselStore();
    for (const vessel of mockVessels) {
      store.addVessel(vessel);
    }
    expect(store.vessels.length).toBe(mockVessels.length);

    store.deleteVessel(mockVessel.id);
    expect(store.vessels.length).toBe(mockVessels.length - 1);
  });
});
