<script setup lang="ts">
import { ref } from 'vue';
import { NConfigProvider, NModalProvider, NModal } from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import Sidebar from './components/Sidebar.vue';
import Map from './components/Map.vue';

const showModal = ref(false);

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4D6BFE',
    primaryColorHover: '#4763ec',
    primaryColorPressed: '#3c53c4',
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal-provider>
      <n-modal
        v-model:show="showModal"
        class="modal"
        preset="dialog"
        :show-icon="false"
        positive-text="Add Vessel"
        negative-text="Cancel"
      >
        <h2>Track New Vessel</h2>
      </n-modal>
      <div class="app-container">
        <Sidebar @open-modal="showModal = true" />
        <Map />
      </div>
    </n-modal-provider>
  </n-config-provider>
</template>

<style>
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
</style>
