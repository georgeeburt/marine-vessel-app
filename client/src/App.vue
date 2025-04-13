<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-modal-provider>
        <div class="app-container">
          <Sidebar @open-modal="showModal = true" />
          <Map />
        </div>
        <TrackForm v-model:show="showModal" />
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NConfigProvider, NModalProvider, NMessageProvider } from 'naive-ui';
import TrackForm from './components/modals/TrackModal.vue';
import Sidebar from './components/layout/Sidebar.vue';
import Map from './components/layout/Map.vue';
import { useSocket } from './composables/use-socket';
import { useVesselData } from './composables/use-vessel-data';
import type { GlobalThemeOverrides } from 'naive-ui';

const showModal = ref(false);
onMounted(async () => {
  await useVesselData();
  useSocket().listenToVesselEvents();
});

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4D6BFE',
    primaryColorHover: '#4763ec',
    primaryColorPressed: '#3c53c4',
  },
};
</script>

<style scoped>
body,
html {
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

.custom-card {
  width: 35%;
  background-color: #3e384c;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
