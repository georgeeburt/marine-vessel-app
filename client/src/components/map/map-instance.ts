import { ref } from 'vue';
import { useMarkerStore } from '@/stores/marker-store';
import { capitaliseLetters } from '@/utils/text-formatters';
import type { Ref } from 'vue';
import type { Vessel } from '@shared/types/vessel';

export const map: Ref<google.maps.Map | null> = ref(null);
export const currentOpenInfoWindow: Ref<google.maps.InfoWindow | null> = ref(null);

export const setMap = (mapInstance: google.maps.Map) => {
  map.value = mapInstance;
};

export const getMap = (): google.maps.Map | null => {
  return map.value;
};

export const getInfoWindowContent = (vessel: Vessel) => {
  return `
    <div class="info-window">
      <h3>${capitaliseLetters(vessel.name)}</h3>
      <p>Latitude: ${vessel.latitude}</p>
      <p>Longitude: ${vessel.longitude}</p>
    </div>
  `;
};

export const openInfoWindowForVessel = (vessel: Vessel) => {
  if (!map.value) return;

  if (currentOpenInfoWindow.value) {
    currentOpenInfoWindow.value.close();
    currentOpenInfoWindow.value = null;
  }

  const markerStore = useMarkerStore();
  const markerData = markerStore.markers.find((m) => m.id === vessel.id);

  if (markerData) {
    const infoWindow = new google.maps.InfoWindow({
      content: getInfoWindowContent(vessel),
    });

    infoWindow.open({
      map: map.value,
      anchor: markerData.marker,
      shouldFocus: false,
    });

    currentOpenInfoWindow.value = infoWindow;

    infoWindow.addListener('closeclick', () => {
      currentOpenInfoWindow.value = null;
    });
  }
};
