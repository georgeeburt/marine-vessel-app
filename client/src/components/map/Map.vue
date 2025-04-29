<template>
  <div class="map-container">
    <div id="map" ref="mapRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Loader } from '@googlemaps/js-api-loader';
import { setMap, currentOpenInfoWindow } from './map-instance';
import { useSocket } from '@/composables/use-socket';
import { useVesselStore } from '@/stores/vessel-store';
import { useMarkerStore } from '@/stores/marker-store';
import { useVesselData } from '@/composables/use-vessel-data';
import { capitaliseLetters } from '@/utils/text-formatters';
import type { Vessel } from '@shared/types/vessel';

const vesselStore = useVesselStore();
const markerStore = useMarkerStore();
const { vessels } = storeToRefs(vesselStore);

let map: google.maps.Map | null = null;

const attachMarkerListeners = (
  marker: google.maps.marker.AdvancedMarkerElement,
  infoWindow: google.maps.InfoWindow,
  vessel: Vessel,
  getInfoWindowContent: (vessel: Vessel) => string
) => {
  marker.addListener('click', () => {
    if (currentOpenInfoWindow.value) {
      currentOpenInfoWindow.value.close();
    }

    vesselStore.toggleSelectedVessel(vessel.id);

    const updatedVessel = vessels.value.find((v) => v.id === vessel.id) || vessel;
    infoWindow.setContent(getInfoWindowContent(updatedVessel));

    infoWindow.open(map, marker);
    currentOpenInfoWindow.value = infoWindow;
  });

  infoWindow.addListener('closeclick', () => {
    currentOpenInfoWindow.value = null;
    vesselStore.selectedVesselId = null;
  });
};

const getInfoWindowContent = (vessel: Vessel) => {
  const currentVessel = vessels.value.find((v) => v.id === vessel.id) || vessel;
  return `
    <div class="info-window">
      <h3>${capitaliseLetters(currentVessel.name)}</h3>
      <p>Latitude: ${currentVessel.latitude}</p>
      <p>Longitude: ${currentVessel.longitude}</p>
    </div>
  `;
};

onMounted(async () => {
  try {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'quarterly',
    });
    const { Map, InfoWindow } = (await loader.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;
    const mapElement = document.getElementById('map');

    map = new Map(mapElement as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 3,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
      gestureHandling: 'greedy',
      minZoom: 2.5,
      maxZoom: 5,
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          east: 180,
          west: -180,
        },
        strictBounds: true,
      },
      streetViewControl: false,
      colorScheme: 'DARK',
      mapTypeControl: false,
    });
    setMap(map);

    await useVesselData();

    const { AdvancedMarkerElement, PinElement } = (await loader.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;
    const PIN_STYLES = {
      background: '#2C3D92',
      borderColor: '#4D6BFE',
      glyphColor: '#4D6BFE',
    };

    map.addListener('click', () => {
      if (currentOpenInfoWindow.value) {
        currentOpenInfoWindow.value.close();
        currentOpenInfoWindow.value = null;
      }

      vesselStore.selectedVesselId = null;
    });

    watch(
      vessels,
      (newVessels) => {
        newVessels.forEach((vessel: Vessel) => {
          if (!markerStore.markers.find((marker) => marker.id === vessel.id)) {
            const pinBackground = new PinElement(PIN_STYLES);
            const marker = new AdvancedMarkerElement({
              map,
              position: { lat: vessel.latitude, lng: vessel.longitude },
              title: vessel.name,
              content: pinBackground.element,
            });

            const infoWindow = new InfoWindow({
              content: getInfoWindowContent(vessel),
              position: { lat: vessel.latitude, lng: vessel.longitude },
            });

            attachMarkerListeners(marker, infoWindow, vessel, getInfoWindowContent);

            markerStore.addMarker({ marker, ...vessel });
          }
        });
      },
      { deep: true }
    );

    watch(
      () => vesselStore.selectedVesselId,
      (newSelectedId) => {
        markerStore.markers.forEach((markerData) => {
          if (!markerData.marker.content) return;

          const pinElement = markerData.marker.content as HTMLElement;

          if (markerData.id === newSelectedId) {
            pinElement.style.transform = 'scale(1.2)';
            pinElement.style.zIndex = '1000';
          } else {
            pinElement.style.transform = 'scale(1.0)';
            pinElement.style.zIndex = '';
          }
        });
      }
    );

    vessels.value.forEach((vessel: Vessel) => {
      const pinBackground = new PinElement(PIN_STYLES);
      const marker = new AdvancedMarkerElement({
        map,
        position: { lat: vessel.latitude, lng: vessel.longitude },
        title: vessel.name,
        content: pinBackground.element,
      });

      const infoWindow = new InfoWindow({
        content: getInfoWindowContent(vessel),
        position: { lat: vessel.latitude, lng: vessel.longitude },
      });

      attachMarkerListeners(marker, infoWindow, vessel, getInfoWindowContent);
      markerStore.addMarker({ marker, ...vessel });
    });

    useSocket().listenToVesselEvents();
  } catch (error) {
    console.error('Error initializing Google Maps:', error);
  }
});
</script>

<style scoped>
.map-container {
  flex: 1;
  height: 100vh;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
