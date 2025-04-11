<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Map from './components/Map.vue';
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <Map />
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.app-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}
</style>