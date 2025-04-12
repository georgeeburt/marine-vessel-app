<template>
  <section id="sidebar">
    <h1>Marine Vessels</h1>
    <div class="action-container">
      <n-input class="search" type="text" placeholder="Search for Vessel"
        ><template #suffix><n-icon :component="Search" /></template
      ></n-input>
      <NButton class="add-button" type="primary" @click="$emit('open-modal')">
        <n-icon color="white" class="icon-spacing">
          <AddSharp />
        </n-icon>
        Add Vessel
      </NButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NButton, NIcon, NInput } from 'naive-ui';
import { AddSharp, Search } from '@vicons/ionicons5';

defineEmits(['open-modal']);
</script>

<style scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  height: 100vh;
  width: 15%;
  background-color: #e5e5e5;
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
  white-space: normal;
}

.icon-spacing {
  margin-right: 4px;
}
</style>
