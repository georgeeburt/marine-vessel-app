<template>
  <div class="map-container">
    <div id="map" ref="mapRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const mapRef = ref<HTMLElement | null>(null);
const map = ref<google.maps.Map | null>(null);

onMounted(async () => {
  if (!mapRef.value) return;

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'quarterly',
  });

  const { Map } = await loader.importLibrary('maps');

  map.value = new Map(mapRef.value, {
    center: { lat: 0, lng: 0 },
    zoom: 3,
  });
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
