<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import AddSharp from '@vicons/ionicons5/AddSharp';

defineEmits(['open-modal']);
</script>

<template>
  <section id="sidebar">
    <h1>Marine Vessels</h1>
    <div class="action-container">
      <input type="text" placeholder="Search for Vessels..." class="search" />
      <NButton class="add-button" type="primary" @click="$emit('open-modal')">
        <n-icon color="white" class="icon-spacing">
          <AddSharp />
        </n-icon>
        Add Vessel
      </NButton>
    </div>
  </section>
</template>

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
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
