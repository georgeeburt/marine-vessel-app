import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMap } from '../components/map/map-instance';
import type { VesselMarker } from '@shared/types/vessel-marker';

export const useMarkerStore = defineStore('marker', () => {
  const markers = ref<VesselMarker[]>([]);

  const addMarker = (marker: VesselMarker) => {
    const currentMap = getMap();
    marker.marker.map = marker.marker.map || currentMap;
    markers.value = [...markers.value, marker];
  };

  const updateMarker = (updatedMarker: VesselMarker) => {
    const index = markers.value.findIndex((marker) => marker.id === updatedMarker.id);
    if (index !== -1) {
      markers.value[index].marker.position = updatedMarker.marker.position;

      markers.value[index].latitude = updatedMarker.latitude;
      markers.value[index].longitude = updatedMarker.longitude;
      markers.value[index].name = updatedMarker.name;
    }
  };

  const deleteMarker = (markerId: number) => {
    const markerToDelete = markers.value.find((marker) => marker.id === markerId);
    if (markerToDelete) {
      markerToDelete.marker.map = null;
    }

    markers.value = markers.value.filter((marker) => marker.id !== markerId);
  };

  const resetMarkers = () => {
    markers.value.forEach((marker) => {
      marker.marker.map = null;
    });
    markers.value = [];
  };

  return {
    markers,
    addMarker,
    updateMarker,
    deleteMarker,
    resetMarkers,
  };
});
