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
    primaryColorPressed: '#3c53c4',
    textColorBase: '#dbdbdb',
    textColor1: '#dbdbdb',
    textColor2: '#dbdbdb',
    borderRadius: '5px',
    borderColor: '#4D6BFE',
    hoverColor: '#4D6BFE',
    primaryColorHover: '#7b92ff',
  },
  Card: {
    color: '#283783',
    borderRadius: '5px',
    borderColor: '#384db4',
    textColor: '#dbdbdb',
    titleFontWeight: '200',
    titleFontSizeMedium: '17px',
  },
  Dialog: {
    color: '#1B2454',
    negativeColor: '#4D6BFE',
    closeIconColor: '#4D6BFE',
  },
  Input: {
    backgroundColor: '#141a3d',
    iconColor: '#7c7c7c',
    borderColorSuccess: '#4D6BFE',
    boxShadowFocusSuccess: 'none',
    color: '#141a3d',
    colorFocus: '#10142e',
    colorFocusError: '#10142e',
    colorFocusWarning: '#10142e',
    colorFocusSuccess: '#10142e',
    colorFocusInfo: '#10142e',
    textColor: '#b2b2b2',
    placeholderColor: '#7c7c7c',
  },
  Message: {
    colorError: '#293783',
    colorSuccess: '#293783',
    textColor: '#ffffff',
    closeIconColor: '#4D6BFE',
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
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
