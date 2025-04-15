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
import VesselFormModal from './components/ui/VesselFormModal.vue';
import Sidebar from './components/sidebar/Sidebar.vue';
import Map from './components/map/Map.vue';
import type { GlobalThemeOverrides } from 'naive-ui';

const showModal = ref(false);

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
