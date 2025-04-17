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
import '@/assets/styles/map.css';

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
  align-items: center;
  padding: 8px 12px;
}

.icon-spacing {
  margin-right: 4px;
}
</style>
