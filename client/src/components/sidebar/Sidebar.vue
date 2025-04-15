<template>
  <aside id="sidebar">
    <div class="action-container">
      <n-input
        v-model:value="searchQuery"
        class="search"
        type="text"
        placeholder="Search..."
        clearable
        ><template #suffix><n-icon :component="Search" /></template
      ></n-input>
      <n-button class="add-button" type="primary" @click="$emit('open-modal')">
        <n-icon color="white" class="icon-spacing">
          <AddSharp />
        </n-icon>
        Add Vessel
      </n-button>
    </div>
    <VesselList :filter-query="searchQuery" />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon, NInput } from 'naive-ui';
import { AddSharp, Search } from '@vicons/ionicons5';
import VesselList from './VesselList.vue';

defineEmits(['open-modal']);
const searchQuery = ref('');
</script>

<style scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 25px;
  height: 100vh;
  width: 18%;
  background-color: #1b2454;
  border-right: 1px solid #445ad6;
}

.action-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
  width: 100%;
}

.search {
  flex: 1;
  width: 70%;
}

.add-button {
  display: flex;
  color: #dbdbdb;
  align-items: center;
  padding: 8px 12px;
}

.icon-spacing {
  margin-right: 4px;
}
</style>

<style>
/* InfoWindow styling */
.gm-style .gm-style-iw-c {
  background-color: #293783;
  padding: 0 !important;
  border-radius: 8px !important;
}

.gm-style .gm-style-iw-d {
  background-color: #293783;
  color: #dbdbdb;
  overflow: hidden !important;
  padding: 15px;
}

.gm-style .gm-style-iw-tc::after {
  background: #293783 !important;
}

.gm-style .gm-style-iw button.gm-ui-hover-effect {
  background-color: #4d6bfe;
  border-radius: 50% !important;
}

.gm-style .gm-style-iw button.gm-ui-hover-effect img,
.gm-style .gm-style-iw button.gm-ui-hover-effect span {
  filter: invert(41%) sepia(94%) saturate(1307%) hue-rotate(217deg) brightness(100%)
    contrast(101%) !important;
}
</style>
