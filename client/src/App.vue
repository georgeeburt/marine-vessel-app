<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-modal-provider>
        <n-dialog-provider>
          <div class="app-container">
            <Sidebar @open-modal="showModal = true" />
            <Map />
          </div>
          <VesselFormModal :show="showModal" @update:show="showModal = $event" />
        </n-dialog-provider>
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  NConfigProvider,
  NModalProvider,
  NMessageProvider,
  NDialogProvider,
} from 'naive-ui';
import { themeOverrides } from './assets/styles/theme-overrides';
import VesselFormModal from './components/ui/VesselFormModal.vue';
import Sidebar from './components/sidebar/Sidebar.vue';
import Map from './components/map/Map.vue';

const showModal = ref(false);
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
  width: 100%;
  height: 100vh;
}
</style>
