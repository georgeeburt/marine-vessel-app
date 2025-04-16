import { setActivePinia, createPinia } from 'pinia';
import { it, describe, beforeEach, expect } from 'vitest';
import { useMarkerStore } from '../../../src/stores/marker-store';
import { mockVesselMarker, mockVesselMarkers } from '../../mocks/markers';

describe('Marker Store', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('should add a vessel to the store', () => {
    const store = useMarkerStore();
    for (const vessel of mockVesselMarkers) {
      store.addMarker(vessel);
    }

    expect(store.markers.length).toBe(mockVesselMarkers.length);
  });

  it('should update a vessel in the store', () => {
    const store = useMarkerStore();
    for (const vessel of mockVesselMarkers) {
      store.addMarker(vessel);
    }
    const updatedVessel = { ...mockVesselMarker, name: 'Updated Vessel' };
    store.updateMarker(updatedVessel);

    expect(store.markers[0].name).toEqual('Updated Vessel');
    expect(store.markers[0].latitude).toEqual(mockVesselMarker.latitude);
    expect(store.markers[0].longitude).toEqual(mockVesselMarker.longitude);
  });

  it('should delete a vessel from the store', () => {
    const store = useMarkerStore();

    for (const vessel of mockVesselMarkers) {
      store.addMarker(vessel);
    }

    store.deleteMarker(mockVesselMarker.id);

    expect(store.markers.length).toBe(mockVesselMarkers.length - 1);
    expect(store.markers[0].name).toEqual(mockVesselMarkers[1].name);
    expect(store.markers[0].latitude).toEqual(mockVesselMarkers[1].latitude);
    expect(store.markers[0].longitude).toEqual(mockVesselMarkers[1].longitude);
  });
});
