<template>
  <div class="map-container">
    <div id="map" ref="mapRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Loader } from '@googlemaps/js-api-loader';
import { setMap } from '../..//utils/map-instance';
import { useSocket } from '../../composables/use-socket';
import { useVesselStore } from '../../stores/vessel-store';
import { useMarkerStore } from '../../stores/marker-store';
import { useVesselData } from '../../composables/use-vessel-data';
import type { Vessel } from '@shared/types/vessel';

const vesselStore = useVesselStore();
const markerStore = useMarkerStore();
const { vessels } = storeToRefs(vesselStore);

let map: google.maps.Map | null = null;

onMounted(async () => {
  try {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'quarterly',
    });
    const { Map } = (await loader.importLibrary('maps')) as google.maps.MapsLibrary;
    const mapElement = document.getElementById('map');

    map = new Map(mapElement as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 3,
      mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
    });
    setMap(map);

    await useVesselData();

    const { AdvancedMarkerElement, PinElement } = (await loader.importLibrary(
      'marker'
    )) as google.maps.MarkerLibrary;

    const PIN_STYLES = {
      background: '#4D6BFE',
      borderColor: '8DA0FF',
      glyphColor: '#8DA0FF'
    };

    watch(
      vessels,
      (newVessels) => {
        console.log('[watch] vessels changed:', newVessels);
        newVessels.forEach((vessel: Vessel) => {
          if (!markerStore.markers.find((marker) => marker.id === vessel.id)) {
            const pinBackground = new PinElement(PIN_STYLES);
            const marker = new AdvancedMarkerElement({
              map,
              position: { lat: vessel.latitude, lng: vessel.longitude },
              title: vessel.name,
              content: pinBackground.element,
            });

            markerStore.addMarker({ marker, ...vessel });
          }
        });
      },
      { deep: true }
    );

    vessels.value.forEach((vessel: Vessel) => {
      const pinBackground = new PinElement(PIN_STYLES);
      const marker = new AdvancedMarkerElement({
        map,
        position: { lat: vessel.latitude, lng: vessel.longitude },
        title: vessel.name,
        content: pinBackground.element,
      });

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
